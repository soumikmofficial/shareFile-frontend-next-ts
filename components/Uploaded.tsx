import React, { useState, useEffect } from "react";
import styles from "styles/Uploaded.module.scss";
import { AiFillCopy } from "react-icons/ai";
import { convertBytes } from "utils/utils";
import axios from "axios";

const Uploaded: React.FunctionComponent<{
  downloadUrl: string;
  file: any;
  id: string | null;
}> = ({ downloadUrl, file, id }) => {
  // todo: states
  const [emails, setEmails] = useState({
    to: "",
    from: "",
  });
  const [sendState, setSendState] = useState<
    "sending" | "sent" | "send" | "failed"
  >("send");

  // todo: handler functions
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmails({ ...emails, [e.target.name]: e.target.value });
  };

  const handleSend = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSendState("sending");
    try {
      const { data } = await axios.post(`/api/v1/file/email/${id}`, {
        to: emails.to,
        from: emails.from,
        url: downloadUrl,
      });
      setSendState("sent");
    } catch (error) {
      console.log(error);
      setSendState("failed");
    }
  };

  // todo: reset send state for sending new emails
  useEffect(() => {
    if (sendState === "sent" || sendState === "failed") {
      setTimeout(() => {
        setSendState("send");
      }, 5000);
    }
  }, [sendState]);

  // todo: return
  return (
    <div className={styles.container}>
      <div className={styles.fileDetails}>
        <p className={styles.name}>{file.name}</p>
        <p className={styles.size}>{convertBytes(file.size)} mb</p>
      </div>
      <div className={styles.url}>
        <p className={styles.link}>{downloadUrl}</p>
        <AiFillCopy
          className={styles.icon}
          onClick={() => navigator.clipboard.writeText(downloadUrl)}
        />
      </div>
      <div className={styles.email}>
        {sendState === "sent" ? (
          <p className={styles.sent}>Email sent successfully</p>
        ) : (
          <form
            onSubmit={(e) => {
              handleSend(e);
            }}
          >
            <div className={styles.formGroup}>
              <input
                type="text"
                placeholder="email from"
                name="from"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className={styles.formGroup}>
              <input
                type="text"
                placeholder="email to"
                name="to"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <button type="submit" disabled={sendState !== "send"}>
              {sendState}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Uploaded;
