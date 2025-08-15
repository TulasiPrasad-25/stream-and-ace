import { Header } from "@/components/Header";
import { CourseCard } from "@/components/CourseCard";
import { StatsCard } from "@/components/StatsCard";
import { QuizCard } from "@/components/QuizCard";
import { VideoPlayer } from "@/components/VideoPlayer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Trophy, 
  Clock, 
  Target,
  TrendingUp,
  Calendar,
  Play,
  ArrowRight,
  Star,
  Users
} from "lucide-react";

// Mock data
const enrolledCourses = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp",
    instructor: "Dr. Sarah Johnson",
    description: "Master modern web development with React, Node.js, and MongoDB. Build real-world projects and deploy them to production.",
    duration: "12 hours",
    students: 15420,
    rating: 4.8,
    progress: 65,
    thumbnail: "/api/placeholder/400/300",
    level: "Intermediate" as const,
    category: "Web Development"
  },
  {
    id: "2",
    title: "Data Science with Python",
    instructor: "Prof. Michael Chen",
    description: "Learn data analysis, machine learning, and visualization using Python, pandas, and scikit-learn.",
    duration: "18 hours",
    students: 8230,
    rating: 4.9,
    progress: 23,
    thumbnail: "/api/placeholder/400/300",
    level: "Advanced" as const,
    category: "Data Science"
  }
];

const recommendedCourses = [
  {
    id: "3",
    title: "UI/UX Design Fundamentals",
    instructor: "Jessica Williams",
    description: "Master the principles of user interface and user experience design with hands-on projects.",
    duration: "8 hours",
    students: 12580,
    rating: 4.7,
    thumbnail: "/api/placeholder/400/300",
    level: "Beginner" as const,
    category: "Design"
  },
  {
    id: "4",
    title: "Mobile App Development with React Native",
    instructor: "David Rodriguez",
    description: "Build cross-platform mobile applications using React Native and deploy to app stores.",
    duration: "15 hours",
    students: 9670,
    rating: 4.6,
    thumbnail: "/api/placeholder/400/300",
    level: "Intermediate" as const,
    category: "Mobile Development"
  }
];

const quizData = {
  title: "JavaScript Fundamentals Quiz",
  description: "Test your knowledge of JavaScript basics including variables, functions, and control structures.",
  timeLimit: 15,
  totalPoints: 100,
  questions: [
    {
      id: "1",
      question: "What is the correct way to declare a variable in JavaScript?",
      options: ["var myVariable;", "variable myVariable;", "v myVariable;", "declare myVariable;"],
      correctAnswer: 0,
      explanation: "The 'var' keyword is used to declare variables in JavaScript."
    },
    {
      id: "2",
      question: "Which method is used to add an element to the end of an array?",
      options: ["append()", "push()", "add()", "insert()"],
      correctAnswer: 1,
      explanation: "The push() method adds one or more elements to the end of an array."
    }
  ]
};

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, John! 👋</h1>
              <p className="text-lg text-muted-foreground">Ready to continue your learning journey?</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="px-3 py-1">
                <Trophy className="h-4 w-4 mr-1" />
                Level 5 Learner
              </Badge>
              <Button variant="hero" className="gap-2">
                <Play className="h-4 w-4" />
                Resume Last Lesson
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Courses Enrolled"
            value={12}
            change="+2 this month"
            icon={BookOpen}
          />
          <StatsCard
            title="Hours Learned"
            value="156h"
            change="+12h this week"
            icon={Clock}
          />
          <StatsCard
            title="Certificates Earned"
            value={8}
            change="+1 this week"
            icon={Trophy}
            gradient={true}
          />
          <StatsCard
            title="Quiz Average"
            value="87%"
            change="+5% improvement"
            icon={Target}
          />
        </div>

        {/* Continue Learning Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Continue Learning</h2>
            <Button variant="outline" className="gap-2">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {enrolledCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </section>

        {/* Featured Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Recent Activity */}
          <div className="lg:col-span-1">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 bg-secondary rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Completed "React Hooks" lesson</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 bg-quiz rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Scored 95% on JavaScript Quiz</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 bg-achievement rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Earned "React Developer" certificate</p>
                    <p className="text-xs text-muted-foreground">3 days ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 bg-primary rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Started "Data Science with Python"</p>
                    <p className="text-xs text-muted-foreground">1 week ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Quiz */}
          <div className="lg:col-span-2">
            <QuizCard {...quizData} />
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <section className="mb-12">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-accent" />
                Upcoming Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Final Project</h4>
                    <Badge variant="destructive">Due Soon</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Web Development Bootcamp</p>
                  <p className="text-sm font-medium text-destructive">Due in 3 days</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Module 3 Quiz</h4>
                    <Badge variant="secondary">This Week</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Data Science with Python</p>
                  <p className="text-sm font-medium text-accent">Due in 5 days</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Peer Review</h4>
                    <Badge variant="outline">Optional</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">UI/UX Design Fundamentals</p>
                  <p className="text-sm font-medium text-muted-foreground">Due in 1 week</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Recommended Courses */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Recommended for You</h2>
            <Button variant="outline" className="gap-2">
              Explore All <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {recommendedCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;