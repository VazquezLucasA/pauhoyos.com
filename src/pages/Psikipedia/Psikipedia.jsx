import { useMemo, useState } from 'react';
import CourseCard from '../../components/Psikipedia/CourseCard';
import '../../components/Psikipedia/Psikipedia.css';
import { courses } from '../../data/psikipedia';

export default function Psikipedia() {
  const [query, setQuery] = useState('');
  const filteredCourses = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return courses;
    return courses.filter((course) => (
      course.title.toLowerCase().includes(normalized)
      || course.description.toLowerCase().includes(normalized)
      || course.tag.toLowerCase().includes(normalized)
    ));
  }, [query]);

  return (
    <section className="psikipedia-page">
      <div className="psikipedia-container">
        <div className="psikipedia-intro">
          <p>Psikipedia</p>
          <h1>Recursos para acompañar tu estudio.</h1>
          <p>Apuntes y recorridos de consulta para estudiantes de Psicología de la UNT.</p>
        </div>

        <label className="sr-only" htmlFor="course-search">Buscar materia o tema</label>
        <input
          id="course-search"
          className="course-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar materia o tema"
        />

        {filteredCourses.length ? (
          <div className="courses-grid">
            {filteredCourses.map((course) => <CourseCard key={course.slug} course={course} />)}
          </div>
        ) : (
          <p className="course-empty">No encontramos una materia con ese nombre.</p>
        )}
      </div>
    </section>
  );
}
