export default function WebDesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-100">
      {children}
    </div>
  );
}
