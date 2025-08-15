import { useState } from "react";
import { CheckCircle, XCircle, Clock, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizCardProps {
  title: string;
  description: string;
  timeLimit: number; // in minutes
  questions: QuizQuestion[];
  totalPoints: number;
}

export const QuizCard = ({ title, description, timeLimit, questions, totalPoints }: QuizCardProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit * 60); // Convert to seconds
  const [quizStarted, setQuizStarted] = useState(false);

  const currentQuizQuestion = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: parseInt(value)
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      percentage: Math.round((correct / questions.length) * 100),
      points: Math.round((correct / questions.length) * totalPoints)
    };
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!quizStarted) {
    return (
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-quiz/10 rounded-full flex items-center justify-center mb-4">
            <Award className="h-8 w-8 text-quiz" />
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
          <p className="text-muted-foreground">{description}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <div className="text-2xl font-bold text-quiz">{questions.length}</div>
              <div className="text-sm text-muted-foreground">Questions</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-quiz">{timeLimit}min</div>
              <div className="text-sm text-muted-foreground">Time Limit</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-quiz">{totalPoints}</div>
              <div className="text-sm text-muted-foreground">Total Points</div>
            </div>
          </div>
          <Button 
            className="w-full" 
            variant="quiz" 
            size="lg"
            onClick={() => setQuizStarted(true)}
          >
            Start Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const isPassingGrade = score.percentage >= 70;

    return (
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
            isPassingGrade ? 'bg-secondary/10' : 'bg-destructive/10'
          }`}>
            {isPassingGrade ? (
              <CheckCircle className="h-8 w-8 text-secondary" />
            ) : (
              <XCircle className="h-8 w-8 text-destructive" />
            )}
          </div>
          <CardTitle className="text-xl">
            {isPassingGrade ? 'Congratulations!' : 'Keep Learning!'}
          </CardTitle>
          <p className="text-muted-foreground">
            {isPassingGrade 
              ? 'You passed the quiz!' 
              : 'You can retake this quiz to improve your score.'
            }
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <div className="text-2xl font-bold text-quiz">{score.percentage}%</div>
              <div className="text-sm text-muted-foreground">Score</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-quiz">{score.correct}/{questions.length}</div>
              <div className="text-sm text-muted-foreground">Correct</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-quiz">{score.points}</div>
              <div className="text-sm text-muted-foreground">Points Earned</div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => {
                setCurrentQuestion(0);
                setSelectedAnswers({});
                setShowResults(false);
                setQuizStarted(false);
              }}
            >
              Retake Quiz
            </Button>
            <Button variant="default" className="flex-1">
              Continue Course
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg">Question {currentQuestion + 1} of {questions.length}</CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <Clock className="h-4 w-4" />
              <span>{formatTime(timeRemaining)}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Progress</div>
            <div className="text-lg font-semibold text-quiz">{Math.round(progress)}%</div>
          </div>
        </div>
        <Progress value={progress} className="mt-4" />
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">{currentQuizQuestion.question}</h3>
          
          <RadioGroup
            value={selectedAnswers[currentQuestion]?.toString()}
            onValueChange={handleAnswerSelect}
            className="space-y-3"
          >
            {currentQuizQuestion.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={previousQuestion}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          
          <Button 
            variant="quiz"
            onClick={nextQuestion}
            disabled={selectedAnswers[currentQuestion] === undefined}
          >
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};