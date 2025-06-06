/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Fragment } from 'react';
import { RichtextEditor } from '@/helpers/common/components/richtext';
import { OutlinedButton } from '@/helpers/common/atoms/Buttons';
import { geminiGenerate } from '@/helpers/utils/gemini';
import { useGemini } from '@/stores/gemini';

const About = ({
  basicTabs,
  onChangeHandler,
}: {
  basicTabs: any;
  onChangeHandler: (value: any, key: string) => void;
}) => {
  const apiKey = useGemini((state) => state.apiKey);

  const generateSummary = async () => {
    if (!apiKey) {
      alert('Please set the Gemini API key in the menu.');
      return;
    }
    const text = await geminiGenerate(
      apiKey,
      `Rewrite this summary for an education professional: ${basicTabs.summary}`
    );
    if (text) onChangeHandler(text, 'summary');
  };

  const generateObjective = async () => {
    if (!apiKey) {
      alert('Please set the Gemini API key in the menu.');
      return;
    }
    const text = await geminiGenerate(
      apiKey,
      `Rewrite this career objective for an education professional: ${basicTabs.objective}`
    );
    if (text) onChangeHandler(text, 'objective');
  };
  return (
    <Fragment>
      <RichtextEditor
        label="About me"
        value={basicTabs.summary}
        onChange={(htmlOutput) => {
          onChangeHandler(htmlOutput, 'summary');
        }}
        name="summary"
      />
      <OutlinedButton onClick={generateSummary}>Generate with AI</OutlinedButton>
      <RichtextEditor
        label="Career objective"
        value={basicTabs.objective}
        onChange={(htmlOutput) => {
          onChangeHandler(htmlOutput, 'objective');
        }}
        name="objective"
      />
      <OutlinedButton onClick={generateObjective}>Generate with AI</OutlinedButton>
    </Fragment>
  );
};

export default About;
