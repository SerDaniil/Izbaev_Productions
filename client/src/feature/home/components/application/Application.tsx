import React, { useState } from "react";
import Select from "react-select";
import "./style.css";

const Application: React.FC = (): JSX.Element => {
  const [application, setApplication] = useState<boolean>(false);

  function handleClickApplication(): void {
    setApplication((prev) => !prev);
  }

  const options = [
    { value: "option1", label: "до 100 000 рублей." },
    { value: "option2", label: "100 000 - 500 000 руб." },
    { value: "option3", label: "500 000 - 1 000 000 руб." },
    { value: "option3", label: "от 1 000 000 руб." },
  ];

  return (
    <div>
      <button type="button" onClick={handleClickApplication}>
        <p>Оставить заявку</p>
      </button>
      {application && (
        <aside className="application">
          <form action="">
            <div className="application__wrapper">
              <p>Оставить заявку на проект</p>
              <div className="application__content">
                <div className="application__input--data">
                  <input type="text" required />
                  <div className="application__underline"></div>
                  <label>Введите свое имя</label>
                </div>
                <div className="application__input--data">
                  <input type="text" required />
                  <div className="application__underline"></div>
                  <label>Компания</label>
                </div>
                <div className="application__input--data">
                  <input type="text" required />
                  <div className="application__underline"></div>
                  <label>E-mail</label>
                </div>
                <div className="application__input--data">
                  <input type="text" required />
                  <div className="application__underline"></div>
                  <label>Номер телефона</label>
                </div>
              </div>
              <div className="application__input--data">
                <input type="text" required />
                <div className="application__underline"></div>
                <label>Расскажите о вашем проекте</label>
              </div>
              <Select
                options={options}
                name="selectOption"
                placeholder="Select an option"
              />
              <div>
                <label>
                  <input type="checkbox" />
                </label>
                <span>
                  Нажимая на кнопку «Отправить», Вы даете Согласие на обработку
                  своих персональных данных.
                </span>
              </div>
              <button type="submit" value="Отправить" />
            </div>
          </form>
        </aside>
      )}
    </div>
  );
};

export default Application;
