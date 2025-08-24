function Question(prop) {
  const questionData = prop.questionData;
  const question = questionData.question;
  const options = questionData.options;

  return (
    <>
      <h3>{question.replace(/\*/g, "")}</h3>
      {options.map((option, index) => {
        return (
          <div class="form-check" key={index}>
            <input
              class="form-check-input"
              type="radio"
              name="radioDefault"
              value={option}
              id="radioDefault1"
            />
            <label class="form-check-label" for="radioDefault1">
              {option}
            </label>
          </div>
        );
      })}
    </>
  );
}

export default Question;
