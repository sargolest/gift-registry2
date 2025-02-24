export default function CreatePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">ایجاد لیست جدید</h1>
        <p className="text-gray-600">
          در اینجا می‌توانید یک لیست هدیه جدید ایجاد کنید و آن را با دوستانتان به اشتراک بگذارید.
        </p>
        <form className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            نام لیست:
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            placeholder="مثلاً لیست تولد من"
          />
          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            ایجاد لیست
          </button>
        </form>
      </div>
    </div>
  );
}
