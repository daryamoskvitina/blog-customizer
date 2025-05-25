import React, { FC, useState, useCallback, useEffect } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';

import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
	OptionType,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	onApply: (newState: ArticleStateType) => void;
	initialState?: ArticleStateType;
};

export const ArticleParamsForm: FC<ArticleParamsFormProps> = ({
	onApply,
	initialState = defaultArticleState,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState<ArticleStateType>(initialState);

	const handleFontFamilyChange = useCallback((option: OptionType) => {
		setFormState((prevState) => ({ ...prevState, fontFamilyOption: option }));
	}, []);

	const handleFontColorChange = useCallback((option: OptionType) => {
		setFormState((prevState) => ({ ...prevState, fontColor: option }));
	}, []);

	const handleBackgroundColorChange = useCallback((option: OptionType) => {
		setFormState((prevState) => ({ ...prevState, backgroundColor: option }));
	}, []);

	const handleContentWidthChange = useCallback((option: OptionType) => {
		setFormState((prevState) => ({ ...prevState, contentWidth: option }));
	}, []);

	const handleFontSizeChange = useCallback((option: OptionType) => {
		setFormState((prevState) => ({ ...prevState, fontSizeOption: option }));
	}, []);

	const handleReset = useCallback(() => {
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
	}, [onApply]);

	const handleSubmit = useCallback(
		(e: React.FormEvent) => {
			e.preventDefault();
			onApply(formState);
		},
		[formState, onApply]
	);

	const toggleOpen = useCallback(() => {
		setIsOpen(!isOpen);
	}, [isOpen]);

	const closeOnOutsideClick = useCallback(
		(e: MouseEvent) => {
			if (
				isOpen &&
				!(e.target as HTMLElement).closest(`.${styles.container}`)
			) {
				setIsOpen(false);
			}
		},
		[isOpen]
	);

	useEffect(() => {
		document.addEventListener('mousedown', closeOnOutsideClick);
		return () => {
			document.removeEventListener('mousedown', closeOnOutsideClick);
		};
	}, [closeOnOutsideClick]);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleOpen} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.field}>
						<Text weight={800} size={31} uppercase className={styles.field}>
							Задайте параметры
						</Text>
						<Select
							title='Шрифт'
							options={fontFamilyOptions}
							selected={formState.fontFamilyOption}
							onChange={handleFontFamilyChange}
						/>
					</div>

					<div className={styles.field}>
						<RadioGroup
							title='Размер шрифта'
							name='fontSize'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={handleFontSizeChange}
						/>
					</div>

					<div className={styles.field}>
						<Select
							title='Цвет шрифта'
							// name="fontColor"
							options={fontColors}
							selected={formState.fontColor}
							onChange={handleFontColorChange}
						/>
					</div>

					<div className={styles.field}>
						<Separator />
					</div>

					<div className={styles.field}>
						<Select
							title='Цвет фона'
							// name="backgroundColor"
							options={backgroundColors}
							selected={formState.backgroundColor}
							onChange={handleBackgroundColorChange}
						/>
					</div>

					<div className={styles.field}>
						<Select
							title='Ширина контента'
							options={contentWidthArr}
							selected={formState.contentWidth}
							onChange={handleContentWidthChange}
						/>
					</div>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
