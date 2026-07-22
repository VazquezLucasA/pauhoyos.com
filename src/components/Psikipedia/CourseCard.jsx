import { Link } from 'react-router-dom';
import './Psikipedia.css';

export default function CourseCard({ course }) {
  return (
    <article className="course-card">
      <span className="course-tag">{course.tag}</span>
      <i className={'bi ' + course.icon} />
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <Link to={'/psikipedia/' + course.slug}>Ver guía <i className="bi bi-arrow-up-right" /></Link>
    </article>
  );
}
