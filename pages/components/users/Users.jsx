import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';
import { Divider, Loader } from 'semantic-ui-react';

const Users = ({ students, teachers, user }) => {
  const [loading, setLoading] = useState(false);
  const [sortedTeachers, setSortedTeachers] = useState(teachers);
  const [campuses, setCampuses] = useState([
    'northeast',
    'northwest',
    'southwest',
  ]);

  useEffect(() => {
    setLoading(true);
    const sorted = teachers.sort((a, b) => {
      let textA = a.class.campus.toUpperCase();
      let textB = b.class.campus.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });

    let tempArr = [];
    sorted.forEach((teacher) => {
      if (teacher.class.campus === user.class.campus)
        return tempArr.unshift(teacher);
      return tempArr.push(teacher);
    });

    let sortedCampuses = [];
    tempArr.forEach((teacher) => {
      const campus = teacher.class.campus;
      if (!sortedCampuses.includes(campus)) sortedCampuses.push(campus);
    });

    setCampuses(sortedCampuses);
    setSortedTeachers(tempArr);
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        campuses.map((campus) => (
          <div className="campus-group">
            <div className="teacher-group">
              {teachers.map((teacher) => {
                if (teacher.class.campus === campus)
                  return (
                    <>
                      <UserCard user={teacher} currentUser={user}/>
                    </>
                  );
              })}
            </div>
            <div className="student-group">
              {students.map((student, i) => {
                if (student.class.campus === campus)
                  return (
                    <>
                      <UserCard user={student} currentUser={user}/>
                    </>
                  );
              })}
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default Users;
