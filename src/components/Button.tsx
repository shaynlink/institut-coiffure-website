import styles from '@/styles/components/Button.module.css';
import { classNameIcon } from '@/utils';
import { ButtonHTMLAttributes, CSSProperties, DetailedHTMLProps } from 'react';
import { ForwardRefComponent, HTMLMotionProps, motion } from 'framer-motion';

interface ButtonProps {
    text: string;
    icon?: string | undefined;
    buttonStyles?: CSSProperties | undefined;
    iconStyles?: CSSProperties | undefined;
    motionButton?: HTMLMotionProps<"button"> | undefined;
}

export default function Button({
    text,
    icon,
    buttonStyles,
    iconStyles,
    motionButton,
    ...basicProps
}: ButtonProps & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>): JSX.Element {
    if (!text) {
        throw Error('Missing text in Button component');
    }

    if (!buttonStyles) buttonStyles = {};
    if (!iconStyles) iconStyles = {};

    const wrapperButton = (
        isMotion: boolean,
        props: ForwardRefComponent<HTMLButtonElement, HTMLMotionProps<"button">> | DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
        children: JSX.Element
    ) => {
        if (isMotion) {
            return (
                <motion.button
                    {...props as ForwardRefComponent<HTMLButtonElement, HTMLMotionProps<"button">>}
                >
                    {children}
                </motion.button>
            )
        } else {
            return (
                <button 
                    {...props as DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>}
                >
                    {children}
                </button>
            )
        }
    }

    let motionProps = motionButton ?? {}

    const props = {
        className: styles.icButton,
        style: {...styles, ...buttonStyles},
        ...basicProps,
        ...motionProps
    }

    const children = <>
        {text}{' '}{icon && <span className={classNameIcon} style={{...iconStyles}}>{icon}</span>}
    </>;

    return wrapperButton(
        !!motionButton,
        props as ForwardRefComponent<HTMLButtonElement, HTMLMotionProps<"button">> | DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
        children
    )
}