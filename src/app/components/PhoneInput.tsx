// components/PhoneInput.tsx
import React, { useState } from 'react';
import { Input } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';

interface PhoneInputProps {
  value?: string;
  onChange?: (value: string) => void;
  countryCode?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ value = '', onChange, countryCode = '250' }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/[^\d]/g, '');
    setInputValue(newValue);
    onChange?.(newValue);
  };

  const formatDisplay = (val: string) => {
    const digits = val.split('');
    const template = `${countryCode} --- --- ---`;
    let result = '';
    let digitIndex = 0;

    for (let i = 0; i < template.length; i++) {
      if (template[i] === '-') {
        result += digits[digitIndex] || '-';
        digitIndex++;
      } else {
        result += template[i];
      }
    }

    return result;
  };

  return (
    <Input
      value={formatDisplay(inputValue)}
      onChange={handleChange}
      placeholder={`${countryCode} --- --- ---`}
      prefix={<PhoneOutlined style={{ color: "#C1CF16", fontSize: "18px", marginRight: "20px" }} />}
      style={{ height: "48px" }}
      className="custom-input"
    />
  );
};

export default PhoneInput;