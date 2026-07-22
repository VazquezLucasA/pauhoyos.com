import { Link, useParams } from 'react-router-dom';
import '../../components/Psikipedia/Psikipedia.css';
import { getCourse } from '../../data/psikipedia';

export default function CourseDetailPage() {
  const { slug } = useParams();
  const course = getCourse(slug);

  if (!course) {
    return (
      <section className="course-detail">
        <div className="psikipedia-container">
          <p className="course-empty">No encontramos ese recurso.</p>
          <Link className="back-link" to="/psikipedia">Volver a Psikipedia</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="course-detail">
      <div className="psikipedia-container course-detail-grid">
        <div>
          <p className="course-tag">{course.tag}</p>
          <h1>{course.title}</h1>
          <p className="course-detail-summary">{course.description}</p>
          <Link className="back-link" to="/psikipedia"><i className="bi bi-arrow-left" /> Volver a Psikipedia</Link>
        </div>

        <ol className="course-units">
          {course.units.map((unit, index) => (
            <li key={unit}>
              <span>{index + 1}</span>
              <div>{unit}</div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
