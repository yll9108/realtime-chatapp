import React, { useState } from "react";
import { EyeSlash, Eye } from "react-bootstrap-icons";
import axios from "axios";
import {
  Container,
  Button,
  Stack,
  Form,
  InputGroup,
  FormControl,
  Alert,
} from "react-bootstrap";

export default function PopUp({ userId, trigger, setTrigger }) {
  const [newPassword, setNewPassword] = useState("");
  const [changePasswordError, setChangePasswordError] = useState("");
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    digit: false,
    specialChar: false,
  });
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisibility = () => setPasswordShown(!passwordShown);

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setNewPassword(value);

    setPasswordRequirements({
      length: value.length >= 6,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      digit: /\d/.test(value),
      specialChar: /[~!@#$%^&*()_+=,{}[\]:";'?|]/.test(value),
    });
  };
  const handleChangePassword = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8080/api/settings/${userId}/changepassword`, {
        password: newPassword,
      })
      .then((res) => {
        console.log(res);
        if (res.data.code === 422) {
          setChangePasswordError(false);
        } else if (res.data.code === 401) {
          setChangePasswordError("It's a google account, you can't change it.");
        } else if (res.status === 200) {
          alert("Password changed successfully!");
          setTrigger(false);
        }
      })
      .catch((err) => console.log(err));
  };

  return trigger ? (
    <Container>
      <Stack
        direction="vertically"
        className="align-items-center"
        style={{ textAlign: "center" }}
      >
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Change Password
        </label>
        <form onSubmit={handleChangePassword}>
          <InputGroup>
            <FormControl
              type={passwordShown ? "text" : "password"}
              placeholder="Password"
              onChange={handlePasswordChange}
            />
            <InputGroup.Text onClick={togglePasswordVisibility}>
              {passwordShown ? <EyeSlash /> : <Eye />}
            </InputGroup.Text>
          </InputGroup>
          <div id="password-requirements">
            <p>Password Requirements:</p>
            <ul>
              <li className={passwordRequirements.length ? "valid" : "invalid"}>
                At least 6 characters
              </li>
              <li
                className={passwordRequirements.uppercase ? "valid" : "invalid"}
              >
                At least one uppercase letter (A-Z)
              </li>
              <li
                className={passwordRequirements.lowercase ? "valid" : "invalid"}
              >
                At least one lowercase letter (a-z)
              </li>
              <li className={passwordRequirements.digit ? "valid" : "invalid"}>
                At least one digit (0-9)
              </li>
              <li
                className={
                  passwordRequirements.specialChar ? "valid" : "invalid"
                }
              >
                At least one special character (~!@#$%^&amp;*()_+=,{}[]:";'?|/)
              </li>
            </ul>
          </div>
          <Stack direction="vertically" gap={2}>
            <Button className="btn btn-primary" type="submit">
              Submit
            </Button>
            <Button
              className="btn btn-primary mb-2"
              onClick={() => {
                setTrigger(false);
                setChangePasswordError();
              }}
            >
              Cancel
            </Button>
          </Stack>
          <Stack direction="vertically" gap={2} className="align-items-start">
            {changePasswordError && (
              <Alert
                variant="danger"
                className="d-flex align-items-center mt-2"
              >
                <p>{changePasswordError}</p>
              </Alert>
            )}
          </Stack>
        </form>
        {/* </div> */}
      </Stack>
      <style type="text/css">
        {`
          .valid {
            color: #00bd9b;
          }
          .invalid {
            color: red;
          }
        `}
      </style>
    </Container>
  ) : (
    ""
  );
}
