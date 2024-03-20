import React, { useState } from 'react';
import styled from 'styled-components';
import { AnalyticsBrowser } from "@segment/analytics-next";
import Select from 'react-select';

function SupportTicket() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('');
  const [priority, setPriority] = useState('');
  const analytics = AnalyticsBrowser.load({ writeKey: 'TD0oABfXUMo4C1p01WUgvXL3atnHCaWR' });

  const options = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' }
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    analytics.track('Support Ticket Submitted', {
      title: title,
      description: description,
      severity: severity,
      priority: priority
    });
  };

  return (
    <SupportFormContainer>
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
            value={options.find(option => option.value === severity)}
            onChange={option => setSeverity(option.value)}
            options={options}
            placeholder="Select severity"
          />
        </Label>
        <Label>
          Priority:
          <StyledSelect
            value={options.find(option => option.value === priority)}
            onChange={option => setPriority(option.value)}
            options={options}
            placeholder="Select priority"
          />
        </Label>
        <SubmitButton type="submit" value="Submit" />
      </Form>
    </SupportFormContainer>
  );
}

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
