export default function Unauthorized() {
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-4">403 - Unauthorized</h1>
            <p>You don’t have permission to access this page.</p>
        </div>
    );
}
