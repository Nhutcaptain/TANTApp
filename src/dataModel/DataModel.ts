import { ImageSourcePropType } from "react-native";

interface Option {
    id: number;
    text: string;
    isCorrect: boolean;
  }
  
  interface Question {
    question: string;
    id: number;
    type: string;
    options?: Option[];
    answer?: string;
    expand?: string;
    rightEssayAnswer?: string;
  }
  
  interface Level {
    level: number;
    title: string;
    backgroundImage: string;
    subLevel: SubLevel[];
    backgroundMusic?: number;
  }
  
  
  interface SubLevel {
    subname: string;
    subtitle: string;
    subdescription: string;
    season: number;
    subbackgroundImage: string;
    questions: Question[];
  }

  export { Level, SubLevel, Question, Option };