import styles from '@/styles/components/Schedule.module.css';
import { classNames } from '@/utils';
export const stylesClassNames = styles;

export default function Schedule() {
  return (
    <>
      <div className={classNames(styles.icCardSchedule, 'icBoxShadow')}>
        <h3>Horraires</h3>
        <ul>
          <li><span>Lundi</span> <span>Fermée</span></li>
          <hr />
          <li><span>Mardi</span> <span>09:00 - 18:30</span></li>
          <hr />
          <li><span>Mercredi</span> <span>09:00 - 18:30</span></li>
          <hr />
          <li><span>Jeudi</span> <span>09:00 - 18:30</span></li>
          <hr />
          <li><span>Vendredi</span> <span>09:00 - 18:30</span></li>
          <hr />
          <li><span>Samedi</span> <span>08:30 - 17:30</span></li>
          <hr />
          <li><span>Dimanche</span> <span>Fermée</span></li>
        </ul>
      </div>
    </>
  )
}
