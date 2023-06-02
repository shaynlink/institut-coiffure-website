import styles from '@/styles/components/Button.module.css';
import { classNameIcon } from '@/utils';
import { ButtonHTMLAttributes, CSSProperties, DetailedHTMLProps } from 'react';
import { ForwardRefComponent, HTMLMotionProps, motion } from 'framer-motion';
import Link from 'next/link';

interface ButtonProps {
    text?: string;
    icon?: string | undefined;
    buttonStyles?: CSSProperties | undefined;
    iconStyles?: CSSProperties | undefined;
    motionButton?: HTMLMotionProps<"button"> | undefined;
    href?: string;
}

export default function Button({
    text,
    icon,
    buttonStyles,
    iconStyles,
    motionButton,
    href,
    ...basicProps
}: ButtonProps & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>): JSX.Element {
    if (!text && !icon) {
        throw Error('Must have text or icon props in Button component');
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
                  {href
                  ? (<Link href={href} style={{display: 'flex', alignItems: 'center', gap: '.5rem'}}>{children}</Link>)
                  : children}
                </motion.button>
            )
        } else {
            return (
                <button
                    {...props as DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>}
                >
                    {href
                      ? (<Link href={href} style={{display: 'flex', alignItems: 'center', gap: '.5rem'}}>{children}</Link>)
                      : children}
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
