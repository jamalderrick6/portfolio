import React from "react";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";

const SERVICE_ID = "service_r313tzm";
const TEMPLATE_ID = "template_14gamxx";
const USER_ID = "user_KjHfUjdbiwVSEBamJ9rlF";

class ContactApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID).then(
      (result) => {
        console.log(result.text);
        Swal.fire({
          icon: "success",
          title: "Message Sent Successfully",
        });
      },
      (error) => {
        console.log(error.text);
        Swal.fire({
          icon: "error",
          title: "Ooops, something went wrong",
          text: error.text,
        });
      }
    );
    e.target.reset();
  };

  redirect = (url) => {
    window.open(url, "_blank");
  };

  render() {
    return (
      <section className="Section Contact">
        <div className="container">
          <div className="wrapper">
            <div className="content">
              <div className="grid left-bar">
                <span className="title">Contact Us</span>
                <p>
                  Want to keep in touch with me or talk about stuff. Contact me
                  using below social platforms or send me an email.
                </p>
                <div className="social-icons">
                  {/* facebook icon */}
                  <svg
                    onClick={() =>
                      this.redirect("https://www.facebook.com/jamal.derrick.1/")
                    }
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    viewBox="0 0 35 35"
                  >
                    <g
                      id="facebook_hover"
                      data-name="facebook hover"
                      transform="translate(-780 -5890)"
                    >
                      <rect
                        id="Прямоугольник_2511"
                        data-name="Прямоугольник 2511"
                        width="35"
                        height="35"
                        rx="4"
                        transform="translate(780 5890)"
                        fill="#297730"
                      />
                      <g
                        id="facebook-logo-2"
                        transform="translate(-675.772 5355.617)"
                      >
                        <path
                          id="Path_1325-2"
                          data-name="Path 1325-2"
                          d="M1477.4,543.387l-2.15,0a3.777,3.777,0,0,0-3.977,4.081v1.881h-2.162a.338.338,0,0,0-.338.338v2.726a.338.338,0,0,0,.338.338h2.162v6.879a.338.338,0,0,0,.338.338h2.821a.338.338,0,0,0,.338-.338v-6.878h2.528a.338.338,0,0,0,.338-.338v-2.726a.338.338,0,0,0-.338-.338h-2.529v-1.6c0-.767.183-1.156,1.181-1.156h1.448a.338.338,0,0,0,.338-.338v-2.528a.338.338,0,0,0-.334-.341Z"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </svg>

                  {/* linkedin svg */}
                  <svg
                    onClick={() =>
                      this.redirect(
                        "www.linkedin.com/in/derrick-jamal-a56026116"
                      )
                    }
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    viewBox="0 0 35 35"
                  >
                    <g
                      id="linkedin_hover"
                      data-name="linkedin hover"
                      transform="translate(-727 -5889.69)"
                    >
                      <rect
                        id="Прямоугольник_630"
                        data-name="Прямоугольник 630"
                        width="35"
                        height="35"
                        rx="4"
                        transform="translate(727 5889.69)"
                        fill="#297730"
                      />
                      <g id="linkedin" transform="translate(737 5899.691)">
                        <g
                          id="Сгруппировать_2354"
                          data-name="Сгруппировать 2354"
                          transform="translate(0 5.006)"
                        >
                          <g
                            id="Сгруппировать_2353"
                            data-name="Сгруппировать 2353"
                          >
                            <rect
                              id="Прямоугольник_627"
                              data-name="Прямоугольник 627"
                              width="3.38"
                              height="10.39"
                              fill="#fff"
                            />
                          </g>
                        </g>
                        <g
                          id="Сгруппировать_2356"
                          data-name="Сгруппировать 2356"
                          transform="translate(4.723 5.006)"
                        >
                          <g
                            id="Сгруппировать_2355"
                            data-name="Сгруппировать 2355"
                          >
                            <path
                              id="Контур_8652"
                              data-name="Контур 8652"
                              d="M167.862,160.122c-.036-.011-.07-.024-.108-.034s-.091-.019-.137-.026a3.027,3.027,0,0,0-.606-.061,4.7,4.7,0,0,0-3.632,1.986V160H160v10.39h3.38v-5.667s2.554-3.557,3.632-.945v6.612h3.379v-7.011A3.37,3.37,0,0,0,167.862,160.122Z"
                              transform="translate(-160 -160)"
                              fill="#fff"
                            />
                          </g>
                        </g>
                        <g
                          id="Сгруппировать_2358"
                          data-name="Сгруппировать 2358"
                          transform="translate(0.231 0)"
                        >
                          <g
                            id="Сгруппировать_2357"
                            data-name="Сгруппировать 2357"
                          >
                            <circle
                              id="Эллипс_159"
                              data-name="Эллипс 159"
                              cx="1.895"
                              cy="1.895"
                              r="1.895"
                              fill="#fff"
                            />
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
              <div className="grid form">
                <form onSubmit={this.handleOnSubmit}>
                  <div className="label_input">
                    <label for="name">
                      <span>Enter your name</span>
                    </label>
                    <input
                      onChange={this.validateForm}
                      autoComplete="email"
                      {...this.state.email}
                      id="from_name"
                      name="from_name"
                      type="text"
                      value={this.state.name}
                      required
                      noValidate
                      placeholder="please enter your name"
                    />
                  </div>
                  <div className="separator"></div>

                  <div className="label_input">
                    <label for="email">
                      <span>Enter your email</span>
                    </label>
                    <input
                      onChange={this.validateForm}
                      autoComplete="email"
                      {...this.state.email}
                      id="from_email"
                      name="from_email"
                      type="text"
                      value={this.state.email}
                      required
                      noValidate
                      placeholder="please enter your email"
                    />
                  </div>
                  <div className="separator"></div>
                  <div className="label_input">
                    <label for="message">
                      <span>Enter your message</span>
                    </label>
                    <textarea
                      onChange={this.validateForm}
                      autoComplete="message"
                      {...this.state.email}
                      id="message"
                      name="message"
                      type="text"
                      value={this.state.message}
                      required
                      noValidate
                      placeholder="enter your message"
                    />
                  </div>
                  <div className="separator"></div>
                  <button type="submit">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ContactApp;
