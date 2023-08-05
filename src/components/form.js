import React, { useState } from "react";
import { useFormspark } from "@formspark/use-formspark";
import Button from "./button";

import './form.css'

export const ContactForm = () => {
  const [submit, submitting] = useFormspark({
    formId: "sUpRnpTh"
  });
  const [message, setMessage] = useState("");
  return (
    <form
        className="form"
        onSubmit={async (e) => {
        e.preventDefault();
        await submit({ message })
    }}>

      <textarea
        className="form-container"
        placeholder="서비스 및 공연에 대한 의견이나 제안이 있다면 보내주세요"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button
      variant={"primary"}
      color={"white"}
      type="submit"
      disabled={submitting}
      >
        보내기
      </Button>
    </form>
  );
};
