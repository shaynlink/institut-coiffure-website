import { Lato } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { createRef, useEffect, LegacyRef, useState } from 'react';
import Button from '@/components/Button';
import { classNameIcon, classNames } from '@/utils';
import Image, { ImageProps } from 'next/image';
import ImageViewer from '@/components/ImageViewer';
import Link from 'next/link';

// images
import salonWebp from '../../public/salon.webp';
import productWebp from '../../public/product.webp';
import ongleWebp from '../../public/ongle.webp';

const imgs: ImageProps[] = [
  {
    src: salonWebp,
    alt: "Une image du salon de coiffure",
    width: 6236,
    height: 4157,
    className: styles.icHomeHeroSecondaryImg,
  },
  {
    src: productWebp,
    alt: "Une image de certain produit du salon",
    width: 6234,
    height: 4156,
    className: styles.icHomeHeroSecondaryImg,
  },
  {
    src: ongleWebp,
    alt: "Une image des vernis à ongle du salon",
    width: 6236,
    height: 4157,
    className: styles.icHomeHeroSecondaryImg,
  }
]

const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] })

export default function Home() {
  const [imgSelectedIndex, setImgSelectedIndex] = useState<number | null>(null);
  /**
   * Get DIV container for append canvas (threeJS context)
   * @type {LegacyRef<HTMLDivElement>}
   */
  const model3dContainerRef: LegacyRef<HTMLDivElement> = createRef<HTMLDivElement>();
  const arrowBottomRef: LegacyRef<HTMLDivElement> = createRef<HTMLDivElement>();

  const handleCloseImageViewer = () => {
    setImgSelectedIndex(null);
  }

  const handleOpenImageViewer = (i: number) => {
    setImgSelectedIndex(i);
  }

  useEffect(() => {
    // on dev mode, can usually left context on render and unload model
    // when hot reload
    // you must reload page for create another context
    /**
     * @todo auto reconnect context to threejs
     */
    if (window.renderer3dModelLoaded) {
      // prevent again load another 3D model on dev mode.
      return;
    }
    window.renderer3dModelLoaded = true;

    let mixer: THREE.AnimationMixer | undefined;
    let scissorsModel: THREE.Group | undefined;
    
    const clock = new THREE.Clock();

    const m3DCWidth = (model3dContainerRef.current?.clientWidth ?? 1) + 50;
    const m3DCHeight = model3dContainerRef.current?.clientHeight ?? 1;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(m3DCWidth, m3DCHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    model3dContainerRef.current?.appendChild(renderer.domElement);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    
    const scene = new THREE.Scene();
    scene.environment = pmremGenerator.fromScene(
      new RoomEnvironment(),
      0.04
    ).texture;

    const camera = new THREE.PerspectiveCamera(50, m3DCWidth / m3DCHeight, 1, 100);
    camera.position.set(5, 2, 8);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0.5, 0);
    controls.update();
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.maxDistance = 15;
    controls.minDistance = 10;

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(
      'https://unpkg.com/three@0.149.0/examples/jsm/libs/draco/gltf/'
    );
    dracoLoader.preload();

    const scissorsLoader = new GLTFLoader();
    scissorsLoader.load('barbers_scissors.glb', function(gltf) {
      scissorsModel = gltf.scene;

      scissorsModel.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = new THREE.MeshStandardMaterial({
            color: 0x000000,
            metalness: 0.5,
            roughness: 0.4
          });
        }
      })

      scene.add(scissorsModel);

      mixer = new THREE.AnimationMixer(scissorsModel);
      mixer.clipAction(gltf.animations[ 0 ]).play();

      animate();

    }, function(xhr) {
      console.log('[📦] %s / %s (%s%) barbers scissors\' model downloaded', xhr.loaded, xhr.total, xhr.loaded / xhr.total * 100)
    }, console.error);

    window.onresize = function() {
      const newM3DCWidth = (model3dContainerRef.current?.clientWidth ?? 1) + 50;
      const newM3DCHeight = model3dContainerRef.current?.clientHeight ?? 1

      camera.aspect = newM3DCWidth / newM3DCHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newM3DCWidth, newM3DCHeight);
    }

    function animate() {
      requestAnimationFrame(animate);
      
      const delta = clock.getDelta();
      
      mixer?.update(delta);
      
      controls.update();

      if (scissorsModel) {
        scissorsModel.rotation.y += 0.01
      }
      
      renderer.render(scene, camera);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (arrowBottomRef.current) {
      window.onscroll = () => {
        if (arrowBottomRef.current) {
          const supportPageOffset = window.pageYOffset !== undefined;
          const isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");

          const scrollTop = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
          
          arrowBottomRef.current.style.opacity = `${1 - scrollTop / 500}`;
        }
      }
    }

    return (): void => { window.onscroll = null };
  }, [arrowBottomRef])

  return (
    <>
      <main className={lato.className}>
        <section className={styles.icHomeHeroPrincipal}>
          <div
            className={styles.icHomeHeroPrincipalTextContainer}
          >
            <h1>
              Vous voulez vous faire une <br />
              petite{' '}
              <span style={{color: 'white', textDecoration: 'underline'}}>beauté</span>{' '}
              <span style={{color: 'white'}}>?</span>
            </h1>
            <div style={{display: 'flex', gap: '1rem'}}>
              <Button text={'Reserver maintenant'} icon={'event'}/>
              <Button text={'Appeler'} icon={'call'}/>
            </div>
          </div>
          <div className={styles.icHomeHeroPrincipalContainer}>
            <div className={styles.icHome3DContainer} ref={model3dContainerRef} />
          </div>
        </section>
        <div ref={arrowBottomRef} className={classNames(styles.icArrowBottom, styles.icBounce)}>
          <span className={classNames(styles.icIconArrowBottom, classNameIcon)}>expand_more</span>
        </div>
        <section
          className={styles.icHomeHeroSecondaryContainer}
        >
          <div className={styles.icHomeHeroSecondaryImgsContainer}>
            {imgs.map((image, i) => (
              <div
                key={i}
                className={(i == imgs.length -1 ? styles.icHomeHeroSecondaryImgPlus : '')}
              >
                {i == imgs.length - 1 && (
                  <p
                    className={styles.icHomeHeroSecondaryText}
                    onClick={() => handleOpenImageViewer(i)}  
                  >Voir les photos</p>
                )}
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image
                  {...image}
                  style={{
                    position: i == imgs.length -1 ? 'absolute' : 'unset',
                  }}
                  onClick={() => handleOpenImageViewer(i)}
                />
              </div>
            ))}
          </div>
          {imgSelectedIndex !== null && 
            <ImageViewer
              images={imgs}
              baseIndex={imgSelectedIndex}
              handleClose={handleCloseImageViewer}
            />
          }
          <div className={styles.icHomeHeroSecondaryInfo}>
            <div className={styles.icTextualInfos}>
              <h1>Institut Coiffure</h1>
              <Link
                href={'https://goo.gl/maps/RcA221caMDVTn3sv7'}
                className={styles.icAddress}>105 Rte de Toulouse, 33400 Talence
              </Link>
              <p>05 56 87 11 17</p>
            </div>
            <div>

            </div>
          </div>
        </section>
      </main>
    </>
  )
}
