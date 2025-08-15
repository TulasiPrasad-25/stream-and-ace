import { Clock, Users, Star, Play, BookOpen } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface CourseCardProps {
  id: string;
  title: string;
  instructor: string;
  description: string;
  duration: string;
  students: number;
  rating: number;
  progress?: number;
  thumbnail: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
}

export const CourseCard = ({
  title,
  instructor,
  description,
  duration,
  students,
  rating,
  progress,
  thumbnail,
  level,
  category,
}: CourseCardProps) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-secondary text-secondary-foreground";
      case "Intermediate":
        return "bg-quiz text-accent-foreground";
      case "Advanced":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden border-0 shadow-md">
      {/* Thumbnail */}
      <div className="relative overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button size="icon" variant="hero" className="h-12 w-12 rounded-full">
            <Play className="h-6 w-6 ml-1" />
          </Button>
        </div>

        {/* Category Badge */}
        <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
          {category}
        </Badge>

        {/* Level Badge */}
        <Badge className={`absolute top-3 right-3 ${getLevelColor(level)}`}>
          {level}
        </Badge>
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="h-4 w-4 fill-achievement text-achievement" />
            <span>{rating}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{instructor}</p>
      </CardHeader>

      <CardContent className="py-2">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {description}
        </p>

        {/* Course Stats */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{students.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>12 lessons</span>
          </div>
        </div>

        {/* Progress (if enrolled) */}
        {progress !== undefined && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-progress">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-2">
        {progress !== undefined ? (
          <Button className="w-full" variant="lesson">
            Continue Learning
          </Button>
        ) : (
          <Button className="w-full" variant="default">
            Enroll Now
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};