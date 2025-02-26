# Money In The Bank - Personal Finance Application

A modern, intuitive personal finance application built with Next.js 15, React 19, and Shadcn UI.

## Features

-   **Dashboard**: Get a quick overview of your financial status
-   **Budget Management**: Track income and expenses, set budgets, and monitor spending
-   **Wallet**: Manage your stock and ETF portfolio with real-time data
-   **Investment Tracking**: Monitor your investment portfolio, track performance, and view asset allocation
-   **Settings**: Customize the application to your preferences
-   **Simulations**: Run financial simulations

## Wallet Feature

The wallet feature allows you to:

-   Add stocks and ETFs to your portfolio
-   Track the current value of your holdings
-   Monitor gains and losses
-   Refresh prices from Alpha Vantage API
-   Search for stocks and ETFs by symbol or name

### Alpha Vantage API

This application uses the Alpha Vantage API to fetch real-time stock data. You'll need to get a free API key from [Alpha Vantage](https://www.alphavantage.co/support/#api-key) and add it to your `.env.local` file:

```
ALPHA_VANTAGE_API_KEY=your_api_key
```

The free tier of Alpha Vantage has a limit of 5 API requests per minute and 500 requests per day.

## Tech Stack

-   **Framework**: Next.js 15 (App Router)
-   **UI Library**: React 19
-   **Styling**: Tailwind CSS
-   **Components**: Shadcn UI
-   **Charts**: Recharts
-   **Icons**: Lucide React
-   **Theming**: next-themes (dark/light mode)
-   **API**: Alpha Vantage API

## Getting Started

### Prerequisites

-   Node.js 18.17 or later
-   pnpm (recommended)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/money-in-the-bank.git
    cd money-in-the-bank
    ```

2. Install dependencies:

    ```bash
    pnpm install
    ```

3. Create a `.env.local` file with your Alpha Vantage API key:

    ```bash
    ALPHA_VANTAGE_API_KEY=your_api_key
    ```

4. Run the development server:

    ```bash
    pnpm dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

-   `app/`: Next.js app router pages and layouts
-   `src/components/`: React components
    -   `dashboard/`: Dashboard-specific components
    -   `ui/`: Reusable UI components (from Shadcn UI)
    -   `wallet/`: Wallet-specific components
-   `src/lib/`: Utility functions and helpers
    -   `api/`: API utilities
    -   `context/`: React context providers

## Future Enhancements

-   User authentication
-   Data persistence with a database
-   Transaction import from banks
-   Mobile app with React Native

## License

This project is licensed under the MIT License - see the LICENSE file for details.
