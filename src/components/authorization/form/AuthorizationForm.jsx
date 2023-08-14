import Input from "../../UI/Input";
import LabeledComponent from "../../UI/LabeledComponent";

const AuthorizationForm = () => {
    return (
        <form action="">
            <LabeledComponent label="Логин">
                <Input 
                    required
                    placeholder="admin123"
                />
            </LabeledComponent>
        </form>
    )
}

export default AuthorizationForm;