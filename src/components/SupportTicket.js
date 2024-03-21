import React, { useState } from 'react';
import styled from 'styled-components';
import { AnalyticsBrowser } from "@segment/analytics-next";
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';


function SupportTicket() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('');
  const [priority, setPriority] = useState('');
  const analytics = AnalyticsBrowser.load({ writeKey: 'TD0oABfXUMo4C1p01WUgvXL3atnHCaWR' });
  const [isSubmitted, setIsSubmitted] = useState(false);


  const options = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' }
  ];

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate inputs
    if (!title || !description || !severity || !priority) {
      alert('Please complete all fields before submitting.');
      return;
    }
    const id = uuidv4();
    // Handle form submission here
    analytics.track('Support Ticket Submitted', {
      id: id,
      title: title,
      description: description,
      severity: severity ? severity.value : '',
      priority: priority ? priority.value : ''
    });

    setTitle('');
    setDescription('');
    setSeverity(null);
    setPriority(null);

    setIsSubmitted(true);
  };

  return (
    <SupportFormContainer>
      {isSubmitted && <StyledSuccessMessage>Your ticket was submitted successfully!</StyledSuccessMessage>}
      <StyledHeader>Open a Support Ticket</StyledHeader>
      <Form onSubmit={handleSubmit}>
        <StyledLabel>
          Title:
          <StyledInput type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </StyledLabel>
        <StyledLabel>
          Description:
          <StyledTextArea value={description} onChange={e => setDescription(e.target.value)} />
        </StyledLabel>
        <Label>
          Severity:
          <StyledSelect
            value={severity}
            onChange={option => setSeverity(option || null)}
            options={options}
            placeholder="Select severity"
          />
        </Label>
        <Label>
          Priority:
          <StyledSelect
            value={priority}
            onChange={option => setPriority(option || null)}
            options={options}
            placeholder="Select priority"
          />
        </Label>
        <SubmitButton type="submit" value="Submit" />
      </Form>
    </SupportFormContainer>
  );
}

const StyledSuccessMessage = styled.p`
  color: green;
  margin-bottom: 20px;
  padding: 20px;
  background-color: #d4edda;
  width: 300px;
  outline: 1px solid black;
  border-radius: 5px;
  font-weight: 600;
  text-align: center;
`;

const StyledHeader = styled.h1`
  margin-bottom: 20px;


`;

const StyledTextArea = styled.textarea`
  width: 300px;
  height: 100px;

`;
const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

`;

const StyledInput = styled.input`
  max-width: 300px;
  height: 30px;

`;

const StyledSelect = styled(Select)`
  max-width: 300px;
`;
const SupportFormContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
  padding: 20px;
  background-color: #f5f5f5;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 10px;
`;

const Input = styled.input`
  margin-top: 5px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  max-width: 300px;
`;

const Textarea = styled.textarea`
  margin-top: 5px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const SubmitButton = styled.input`
  margin-top: 20px;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  max-width: 300px;

  &:hover {
    background-color: #0056b3;
  }
`;

export default SupportTicket;
