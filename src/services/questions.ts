import Questions from "../entities/questions";
import Options from "../entities/options";

export default class QuestionsService {

    public static NameRetorno(): string {
        return 'ola mundo';
    }

    public static async PopulateTbQuestions() {
        let ret = new Array<Questions>();
        try {
            //Question 1: Age
            let questionAge = new Questions(1, "Age", [], "number", "input-minmax");
            ret.push(questionAge);

            // Question 2: Gender
            let questionGender = new Questions(2, "Gender ?", [], "text", "dropdown");
            questionGender.Options = new Array<Options>();
            questionGender.Options.push(new Options(1, 2, "M", "m"));
            questionGender.Options.push(new Options(2, 2, "F", "f"));
            questionGender.Options.push(new Options(3, 2, "Other", "other"));
            ret.push(questionGender);

            // Question 3: Do you own a car driving license?
            let questionDriverLicesing = new Questions(
                3,
                "Do you own a car driving license?",
                [],
                "text",
                "radio"
            );
            questionDriverLicesing.Options = new Array<Options>();
            questionDriverLicesing.Options.push(new Options(4, 3, "Yes", "yes"));
            questionDriverLicesing.Options.push(
                new Options(5, 3, "No, I prefer using other transport", "no")
            );
            ret.push(questionDriverLicesing);

            //Question 4: Is this your first car?
            let questionFirstCar = new Questions(
                4,
                "Is this your first car ?",
                [],
                "text",
                "radio"
            );
            questionFirstCar.Options = new Array<Options>();
            questionFirstCar.Options.push(new Options(5, 4, "Yes", "yes"));
            questionFirstCar.Options.push(new Options(6, 4, "No", "no"));
            ret.push(questionGender);

            //Question 5: Which drivetrain do you prefer?
            let questionDriveTrain = new Questions(
                5,
                "Which drivetrain do you prefer?",
                [],
                "text",
                "radio"
            );
            questionDriveTrain.Options = new Array<Options>();
            questionFirstCar.Options.push(new Options(7, 4, "FWD", "rwd"));
            questionFirstCar.Options.push(new Options(8, 4, "RWD", "rwd"));
            questionFirstCar.Options.push(new Options(8, 4, "I don’t know", "idk"));
            ret.push(questionGender);

            //Question 6: Are you worried about fuel emissions?
            let questionFuelEmission = new Questions(
                6,
                "Are you worried about fuel emissions ?",
                [],
                "text",
                "radio"
            );
            questionFuelEmission.Options = new Array<Options>();
            questionFuelEmission.Options.push(new Options(5, 4, "Yes", "yes"));
            questionFuelEmission.Options.push(new Options(6, 4, "No", "no"));
            ret.push(questionGender);

            //Question 7: How many cars do you have in your family?
            let questionCarsFamily = new Questions(
                7,
                "How many cars do you have in your family?",
                [],
                "number",
                "input"
            );
        } catch (error) { }
        return ret;
    }
}
