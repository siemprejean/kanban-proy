import { Inter } from 'next/font/google'
import 'styles/theme.scss';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'TEMIS - Sistema de Comisiones / Incentivos',
  description: 'Sistema para la gestión de comisiones / incentivos',
  keywords: 'Temis, comisiones, incentivos, Admin dashboard, web apps'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='bg-light'>{children}</body>
    </html>
  )
}
