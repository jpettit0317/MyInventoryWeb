
export interface LoadingIndicatorProps {
    shouldRedirect: boolean;
    redirectToPage: () => void;
}

export function LoadingIndicator(props: LoadingIndicatorProps) {
    const loadingContent = "Loading...";

    return (
        <div>
            { props.shouldRedirect ?? props.redirectToPage()}
            {loadingContent}
        </div>
    )
}