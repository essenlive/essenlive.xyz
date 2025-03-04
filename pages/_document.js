import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }
    
    render() {
        const setInitialTheme = `
            function getUserPreference() {
            if(window.localStorage.getItem('theme')) { return window.localStorage.getItem('theme') }
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' }
            document.documentElement.dataset.theme = getUserPreference();
        `;
        const umami = !process.env.NEXT_PUBLIC_UMAMI ? process.env.NEXT_PUBLIC_UMAMI : JSON.parse(process.env.NEXT_PUBLIC_UMAMI);
        return (
            <Html>
                <Head/>
                <body>
                    <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
                    <Main />
                    <NextScript />
                    {umami && <script async defer data-website-id={umami.id} src={umami.url}></script> }
                </body>
            </Html>
        )
    }
}

export default MyDocument