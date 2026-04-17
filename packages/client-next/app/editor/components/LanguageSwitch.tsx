'use client';

import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

const LanguageSwitch = () => {
  const { i18n } = useTranslation();

  const handleChange = (value: string) => {
    i18n.changeLanguage(value);
    localStorage.setItem('i18nextLng', value);
  };

  return (
    <Select
      value={i18n.language}
      onChange={handleChange}
      style={{ width: 100 }}
      size="small"
      options={[
        { value: 'en', label: 'EN' },
        { value: 'cn', label: '中文' },
      ]}
    />
  );
};

export default LanguageSwitch;