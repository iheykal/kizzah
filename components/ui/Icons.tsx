
import React from 'react';

interface IconProps {
  className?: string;
}

export const BedIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10.5 1.5L12 3l1.5-1.5M10.5 1.5V3M13.5 1.5V3m-3 4.5V15m3-7.5V15m-6-7.5V15m6.75-9H7.25a1.5 1.5 0 00-1.5 1.5V15h13.5V6a1.5 1.5 0 00-1.5-1.5z" />
  </svg>
);

export const BathIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
  </svg>
);

export const RulerIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 12h9.75M10.5 18h9.75M3.75 6H7.5m3 12V6.375m0 11.625a1.125 1.125 0 01-1.125 1.125H4.875a1.125 1.125 0 01-1.125-1.125V6.375m0 11.625a1.125 1.125 0 001.125 1.125h.625a1.125 1.125 0 001.125-1.125V6.375m0 11.625V6.375" />
</svg>
);


export const MapPinIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

export const PriceTagIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const SearchIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

export const XMarkIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const FilterIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.572a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
</svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

export const PhoneIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);

export const EmailIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

export const ChevronLeftIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

export const WhatsAppIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.33 3.43 16.79L2.05 22L7.31 20.52C8.72 21.31 10.33 21.78 12.04 21.78C17.5 21.78 21.95 17.33 21.95 11.87C21.95 6.41 17.5 2 12.04 2M12.04 3.67C16.55 3.67 20.28 7.39 20.28 11.91C20.28 16.43 16.55 20.11 12.04 20.11C10.49 20.11 9.03 19.69 7.81 18.95L7.47 18.73L4.5 19.58L5.38 16.7L5.14 16.34C4.32 15.03 3.8 13.5 3.8 11.91C3.8 7.39 7.52 3.67 12.04 3.67M17.32 14.89C17.09 15.43 16.23 15.88 15.77 15.96C15.31 16.04 14.7 16.06 14.21 15.86C13.72 15.66 12.98 15.32 12.11 14.51C10.91 13.41 10.11 12.08 9.91 11.77C9.71 11.46 9.51 11.15 9.51 10.8C9.51 10.45 9.64 10.17 9.82 9.97C10 9.77 10.25 9.65 10.48 9.65C10.58 9.65 10.67 9.66 10.76 9.67C10.93 9.71 11.09 9.76 11.23 10.04C11.38 10.31 11.53 10.64 11.59 10.76C11.65 10.88 11.68 11.01 11.59 11.16C11.5 11.31 11.11 11.76 10.83 12.06C10.56 12.37 10.28 12.45 10.09 12.23C9.9 12.01 9.34 11.53 8.84 11.02C8.23 10.39 7.78 9.73 7.75 9.39C7.71 9.05 7.91 8.82 8.09 8.64C8.28 8.45 8.49 8.26 8.72 8.26C8.94 8.26 9.17 8.33 9.35 8.49C9.54 8.66 9.67 8.88 9.76 9.03C9.85 9.18 9.82 9.35 9.77 9.47L9.26 10.76C9.12 11.09 9.01 11.26 8.83 11.35C8.66 11.43 8.48 11.45 8.24 11.35C8 11.26 7.5 11.11 7.09 10.74C6.69 10.37 6.27 9.79 6.27 9.15C6.27 8.51 6.71 8.03 6.91 7.82C7.11 7.61 7.44 7.48 7.75 7.48C8.02 7.48 8.27 7.53 8.48 7.59C8.7 7.65 8.87 7.73 9.03 7.82C9.32 8 9.51 8.27 9.51 8.59C9.51 8.69 9.5 8.8 9.48 8.9L9.45 9.01C9.42 9.11 9.35 9.22 9.35 9.29C9.35 9.37 9.43 9.47 9.53 9.59C10.41 10.56 11.43 11.41 11.68 11.64C11.83 11.78 12.01 11.95 12.26 11.95C12.51 11.95 12.92 11.73 13.08 11.56C13.24 11.39 13.67 10.87 13.84 10.59C14.01 10.31 14.23 10.27 14.48 10.36C14.74 10.46 15.76 10.96 16.05 11.1C16.34 11.24 16.54 11.33 16.6 11.43C16.67 11.53 16.64 11.73 16.55 11.91C16.46 12.09 15.82 12.69 15.62 12.92C15.42 13.15 15.42 13.32 15.62 13.49C15.82 13.66 16.43 13.99 16.65 14.13C16.87 14.27 17.03 14.33 17.12 14.43C17.21 14.53 17.21 14.64 17.15 14.71L17.32 14.89Z"/>
  </svg>
);
export const PlusIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

export const LoginIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
  </svg>
);

export const LogoutIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m1.5-6l3 3m0 0l-3 3m3-3H9" />
  </svg>
);

export const TrashIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.56 0c1.153 0 2.243.096 3.222.261m3.222.261L12 5.825M12 15V5.825m0 0a4.991 4.991 0 014.991-4.117h.004c2.178 0 4.205.734 5.868 1.995M12 5.825a4.991 4.991 0 00-4.991-4.117H6.995C4.817 1.708 2.79 2.442 1.127 3.7m10.873 2.125V15" />
  </svg>
);
