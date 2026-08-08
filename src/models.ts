/*
 * Copyright (c) 2024 Dianat | 0935 912 0880. All Rights Reserved.
 * This software is the confidential and proprietary information of Dianat.
 */
export interface Option {
  label: string;
  value: number;
}

export interface FieldOption extends Option {
  key: string;
}

export interface CalculationDetail {
  label: string;
  value: string | number;
  iconPaths: string[];
}
