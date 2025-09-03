import { Users, BookOpen } from 'lucide-react'; // For icons
// Card components (simplified for this example)
const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg p-4 ${className}`}>{children}</div>
);
const CardHeader = ({ children }) => <div className="mb-4">{children}</div>;
const CardTitle = ({ children, className = '' }) => (
  <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>
);
const CardContent = ({ children, className = '' }) => (
  <div className={className}>{children}</div>
);

// Main Component
const DashboardCards = ({resentStudent,popularcourse}) => {
    return (
    <div className="grid mb-10 grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recent Students */}
      <Card className="shadow-card border hover:border-[#097C7DFF] hover:shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Recent Students
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {resentStudent?.map((student) => (
            <div
              key={student.id}
              className="flex items-center justify-between hover:shadow-lg p-3 rounded-lg bg-muted/50 bg-gray-100"
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
        </CardContent>
      </Card>

      {/* Popular Courses */}
      <Card className="shadow-card border hover:border-[#097C7DFF] hover:shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Popular Courses
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {popularcourse.map((course) => (
            <div
              key={course.id}
              className="flex items-center hover:shadow-lg justify-between p-3 rounded-lg bg-muted/50 bg-gray-100"
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
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCards;

