import { useState, ChangeEvent, FormEvent } from "react";
import { Input, Icon, MonochromeIcons, CallToAction } from "@magiclabs/ui";

type EmailFormProps = {
  onEmailSubmit: (email: string) => void;
  disabled: boolean;
};

const EmailForm: React.FC<EmailFormProps> = ({ onEmailSubmit, disabled }) => {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    onEmailSubmit(email);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3 className="form-header">Login</h3>
        <div className="input-wrapper">
          <Input
            placeholder="Enter your email"
            size="sm"
            type="email"
            value={email}
            onChange={handleEmailChange}
            prefix={<Icon inline type={MonochromeIcons.Envelope} size={22} />}
          />
        </div>
        <div>
          <CallToAction
            leadingIcon={MonochromeIcons.PaperPlane}
            color="primary"
            size="sm"
            disabled={disabled}
            onClick={handleSubmit}
          >
            Send Magic Link
          </CallToAction>
        </div>
      </form>
      <style jsx>{`
        form,
        label {
          display: flex;
          flex-flow: column;
          text-align: center;
        }
        .form-header {
          font-size: 22px;
          margin: 25px 0;
        }
        .input-wrapper {
          width: 80%;
          margin: 0 auto 20px;
        }
      `}</style>
    </>
  );
};

export default EmailForm;
