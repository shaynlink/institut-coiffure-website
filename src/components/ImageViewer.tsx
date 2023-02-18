import Image, { ImageProps } from 'next/image';
import styles from '@/styles/components/ImageViewer.module.css';
import { useState } from 'react';
import { classNames, removeProperties } from '@/utils';
import Button from '@/components/Button';
import {motion} from 'framer-motion';

interface ImageViewerProps {
    images: ImageProps[];
    baseIndex: number;
    handleClose: () => void;
}

export default function ImageViewer({images, baseIndex, handleClose}: ImageViewerProps) {
    const [index, setIndex] = useState(baseIndex);

    const handleBack = () => {
        if (index <= 0) {
            setIndex(images.length - 1);
        } else {
            setIndex(index - 1);
        }
    }

    const handleNext = () => {
        if (index >= (images.length - 1)) {
            setIndex(0);
        } else {
            setIndex(index + 1);
        }
    }

    const handleSelect = (i: number) => {
        if (i == index) return;
        setIndex(i);
    }

    const getImageProps = (i: number): ImageProps => {
        const image = images[i];
        image.className = styles.icImageViewerImage;

        return removeProperties(image, 'relatedId') as ImageProps;
    }

    return (
        <>
            <motion.div
                className={styles.icImageViewerContainer}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <div className={styles.icImageViewerBack}>
                    <Button
                        icon={'arrow_back_ios'}
                        buttonStyles={{
                            padding: '10px 5px 10px 15px'
                        }}
                        onClick={handleBack}
                    />
                </div>
                <div className={styles.icImageViewerSelectedContainer}>
                    <div className={styles.icImageViwerBigImage}>
                        {/* eslint-disable-next-line jsx-a11y/alt-text */}
                        <Image {...getImageProps(index)} />
                    </div>

                    <div className={styles.icImageViewerThumbnailsContainer}>
                        {images.length < 5 && images.map((image, i) => (
                            // eslint-disable-next-line jsx-a11y/alt-text
                            <Image
                                key={i}
                                {...getImageProps(i)}
                                className={classNames(
                                    styles.icImageViewerImage,
                                    i == index ? styles.icImageViewerImageSelected : ''
                                )}
                                onClick={() => handleSelect(i)}
                            />
                        ))}
                    </div>
                </div>
                <div className={styles.icImageViewerForward}>
                    <div className={styles.icImageViewerBtnClose}>
                        <Button
                            icon={'close'}
                            onClick={handleClose}
                        />
                    </div>
                    <div className={styles.icImageViewerBtnForward}>
                        <Button
                            icon={'arrow_forward_ios'}
                            onClick={handleNext}
                        />
                    </div>
                </div>
            </motion.div>
        </>
    )
}