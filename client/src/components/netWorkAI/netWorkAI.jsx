import { useState } from 'react';
import axios from 'axios'
import styled from 'styled-components';
import ParagraphText from '../paragraphTexts/ParagraphText';
import SectionTitle from '../titles/SectionTitle';
import FormField from './FormField';
import PrimaryButton from '../buttons/PrimaryButton';

const NetworkAIStyles = styled.div`
  padding: 10rem 0;
  display: flex;
  justify-content: center;
  gap: 2rem;
  .form__wrapper,
  .output__wrapper {
    flex: 1;
    padding: 2rem;
    border: 1px solid #ccc;
  }
  .form__wrapper {
    width:60%;
    max-width: 550px;
    .contact__form {
      display: grid;
      grid-template-columns: 1fr;
      row-gap: 2rem; /* Increased space between form fields */
      .contact__field--fullWidth {
        input,
        label {
          display: block;
          width: 100%;
          padding: 0.75rem;
          margin-bottom: 0.5rem;
        }
        input {
          border: 1px solid #ccc;
          border-radius: 4px;
        }
      }
    }
  }
  .output__wrapper {
    background-color: #f7f7f7;
    max-width: 500px;
  }
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    .form__wrapper,
    .output__wrapper {
      max-width: 100%;
    }
  }
`;

// Styled components for the response section
const OutputWrapperStyles = styled.div`
  background-image: linear-gradient(#1ee3e3,#74e8e8,#a6eded);
  border-radius: 8px;
  padding: 2rem;
  width: 40%;
  max-width: 550px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;

  .right-header{
    text-align: left;
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    font-family: Arial;
  }

  .right-subHeader{
    text-align: left;
    font-size: 1.8rem;
    font-family: Arial;
    margin-bottom: 1rem;
  }

  .message-container {
    background-color: white;
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1rem;
    position: relative;
    min-height: 250px;
    /* Enable scrolling when content exceeds the container height */
  overflow-y: auto;

  /* Set a max-height to allow scrolling */
  max-height: 100%;

    .message-header {
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
      text-align: left;
    }

    .message-content {
      font-size: 1.5rem;
      white-space: pre-wrap; /* Keeps the formatting of the message */
      text-align: left;
    }
  }

  .load-more-btn {
    background-color: #0052cc;
    color: white;
    border: none;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 1.2rem;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

function NetworkAISection() {
  const [formData, setFormData] = useState({
    jobFunction: '',
    company: '',
    aboutYou: '',
    experienceLevel: '',
    contributions: '',
    motivation: '',
  });
  
  const [generatedMessages, setGeneratedMessages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Limit the length of the value to 100 chars for specific fields
    if (['aboutYou', 'contributions', 'motivation'].includes(name)) {
      const chars = value.slice(0, 100);
      setFormData({ ...formData, [name]: chars });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };


  const generateMessage = async (formData) => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          model: "gpt-3.5-turbo-instruct",
          prompt: `Act as a connection manager to write a connection message for linkedin and it needs to have limit of 200 characters. Please end the message positively.
          Job Function: ${formData.jobFunction}
          Company: ${formData.company}
          About You: ${formData.aboutYou}
          Experience Level: ${formData.experienceLevel}
          Contributions: ${formData.contributions}
          Motivation: ${formData.motivation}`,
          max_tokens: 250,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`, // Use the actual key variable
          },
        }
      );
      return response.data.choices[0].text;
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error', error.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMessage = await generateMessage(formData);
    setGeneratedMessages(prevMessages => [...prevMessages, newMessage]);
  };
  
  const handleLoadMoreMessages = async () => {
    const newMessage = await generateMessage(formData);
    setGeneratedMessages(prevMessages => [...prevMessages, newMessage]);
  };

  //Linkedin
  function handleToLinkedin() {
    const {company, jobFunction} = formData;
    const linkedinUrl = `https://www.linkedin.com/search/results/people/?company=${company}&keywords=${jobFunction}%20i%27m%20hiring&origin=FACETED_SEARCH&searchId=true&sid=Xa8`;

    window.open(linkedinUrl, "_blank");
  }
  //Button set
  const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;
  return (
    <NetworkAIStyles>
      <div className="form__wrapper">
        <SectionTitle>Fill in your information</SectionTitle>
        <br></br>
        <br></br>
        <ParagraphText>
        Build meaningful connections with hiring managers and 
        recruiters at your dream company to significantly boost 
        your chances of securing that coveted interview!
        </ParagraphText>
        <br></br>
        <br></br>
        <form className="contact__form" onSubmit={handleSubmit}>
          <FormField
            className="contact__field--fullWidth"
            type="text"
            label="What specific job function are you aiming for?"
            name="jobFunction"
            id="jobFunction"
            required
            onChange={handleChange}
          />
          <FormField
            className="contact__field--fullWidth"
            type="text"
            label="Which company do you aspire to join?"
            name="company"
            id="company"
            required
            onChange={handleChange}
          />
          <FormField
            className="contact__field--fullWidth"
            type="textarea"
            label="Define yourself that best captures your essence."
            name="aboutYou"
            id="aboutYou"
            enforceWordLimit={true}
            required
            onChange={handleChange}
          />
          <FormField
            type="select"
            label="What is Your Experience?"
            name="experienceLevel"
            id="experienceLevel"
            required
            onChange={handleChange}
            options={[
              { value: '', label: 'Select Experience Level' },
              { value: 'beginner', label: 'Beginner (0-1 Year)' },
              { value: 'entrance', label: 'Entrance (1-3 Years)' },
              { value: 'professional', label: 'Professional (3-5 Years)' },
              { value: 'expert', label: 'Expert (5+ Years)' },
            ]}
          />
          <FormField
            className="contact__field--fullWidth"
            type="textarea"
            label="What unique skills do you bring?"
            name="contributions"
            id="contributions"
            enforceWordLimit={true}
            required
            onChange={handleChange}
          />
          <FormField
            className="contact__field--fullWidth"
            type="textarea"
            label="Why do you want to work for this company?"
            name="motivation"
            id="motivation"
            enforceWordLimit={true}
            required
            onChange={handleChange}
          />
          <PrimaryButton type="submit" buttonType="button" className="contact__submit" >
            Generate
          </PrimaryButton>
        </form>
      </div>
      <OutputWrapperStyles>
        <div className="right-header">
        Craft and Send Compelling Connection Request Messages.
        </div>
        <br></br>
        <br></br>
        <div className="right-subHeader">
        Discover a message you resonate with, copy it,
        head to LinkedIn, click "connect," select "add a note," 
        paste your message.
        <br></br> 
        <br></br>
        Click <strong>"Load More Messages"</strong> below to access a variety of 
        styles for more diverse message options.
        <br></br>
        <br></br>
        </div>
        {generatedMessages.map((message, index) => (
          <div key={index} className="message-container">
            
            <div className="message-content">{message}</div>
          </div>
        ))}
        {generatedMessages.length === 0 && (
          <div className="message-container">
            <div className="message-content">Your Generated Message Will Be Displayed Here.</div>
          </div>
        )}
        <ButtonsContainer>
        <PrimaryButton onClick={handleLoadMoreMessages}>
          Load more messages
        </PrimaryButton>
        <PrimaryButton onClick={handleToLinkedin}>Linkedin</PrimaryButton>
        </ButtonsContainer>
      </OutputWrapperStyles>
    </NetworkAIStyles>
  );
}

export default NetworkAISection;
