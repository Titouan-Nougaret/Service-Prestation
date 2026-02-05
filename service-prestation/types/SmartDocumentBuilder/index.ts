export interface Question {
  id: string;
  question: string;
  type: "text" | "radio" | "checkbox" | "select" | "number" | "textarea";
  options?: string[];
  condition?: {
    questionId: string;
    value: string;
  };
  required?: boolean;
  subQuestions?: Question[];
  description?: {
    text: string;
    type: "info" | "warning" | "error";
    position: "top" | "bottom";
  };
}

export interface OrderData {
  tarifPrestation: string;
  moyenDePaiement: string;
  nomClient: string;
  prenomClient: string;
  date: string;
  telephoneClient: string;
  adresseClient: string;
  codePostalClient: string;
  villeClient: string;
}
