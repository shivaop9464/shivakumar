/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import * as Icons from 'lucide-react';

interface LucideIconProps {
  name: string;
  className?: string;
  size?: number;
  strokeWidth?: number;
}

export const LucideIcon: React.FC<LucideIconProps> = ({
  name,
  className = '',
  size = 20,
  strokeWidth = 2
}) => {
  // Graceful fallback for missing icons
  const NamedIcon = (Icons as any)[name];
  if (!NamedIcon) {
    // Check capitalization in case model/user typed differently
    const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
    const AlternativeIcon = (Icons as any)[capitalized];
    if (AlternativeIcon) {
      return <AlternativeIcon className={className} size={size} strokeWidth={strokeWidth} />;
    }
    return <Icons.HelpCircle className={className} size={size} strokeWidth={strokeWidth} />;
  }
  return <NamedIcon className={className} size={size} strokeWidth={strokeWidth} />;
};
