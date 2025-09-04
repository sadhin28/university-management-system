import { Users, BookOpen } from 'lucide-react'; // For icons

// Main Component
const DashboardCards = ({resentStudent,popularcourse}) => {
    return (
    <div className="mx-2  grid mb-10 grid-cols-1 lg:grid-cols-2 gap-6 ">
      {/* Recent Students */}
      <div className="p-6 space-y-4 rounded-xl border-2 border-[#097C7DFF] hover:shadow-lg bg-gray-200/20">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Recent Students
          </div>
        </div>
        <div className="space-y-4">
          {resentStudent?.map((student) => (
            <div
              key={student.id}
              className="flex items-center justify-between hover:shadow-lg p-3 rounded-lg bg-muted/50 bg-gray-100/20"
            >
              <div className="space-y-1">
                <p className="font-medium">{student.name}</p>
                <p className="text-sm text-muted-foreground text-gray-500">
                  {student.program} • {student.year}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">GPA: {student.gpa}</p>
                <p className="text-sm text-muted-foreground text-gray-500">{student.studentId}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Courses */}
      <div className="p-6 space-y-4 rounded-xl border-2 border-[#097C7DFF] hover:shadow-lg bg-gray-200/20">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Popular Courses
          </div>
        </div>
        <div className="space-y-4">
          {popularcourse.map((course) => (
            <div
              key={course.id}
              className="flex items-center hover:shadow-lg justify-between p-3 rounded-lg bg-muted/50 bg-gray-100/20"
            >
              <div className="space-y-1">
                <p className="font-medium">{course.name}</p>
                <p className="text-sm text-muted-foreground text-gray-500">
                  {course.code} • {course.instructor}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  {course.enrolled}/{course.capacity}
                </p>
                <p className="text-sm text-muted-foreground text-gray-500">enrolled</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;

