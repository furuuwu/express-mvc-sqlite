const getStudentsWithClasses = `
SELECT
    student.id AS student_id,
    student.name AS student_name,
    GROUP_CONCAT(class.id) AS class_ids,
    GROUP_CONCAT(class.name) AS class_names
FROM student
LEFT JOIN student_class ON student.id = student_class.student_id
LEFT JOIN class ON student_class.class_id = class.id
GROUP BY student.id;`;

module.exports = {
    getStudentsWithClasses,
};
