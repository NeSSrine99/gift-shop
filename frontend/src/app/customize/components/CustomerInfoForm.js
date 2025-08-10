import Input from "@/components/ui/Input";

export default function CustomerInfoForm({ form, handleChange }) {
  return (
    <div className="space-y-6 border-2 border-gray-300 shadow-lg flex flex-col items-stretch justify-center p-4 rounded-lg w-full">
      <h2 className="text-xl text-secondary font-semibold">Customer Info</h2>
      <div className="space-y-4 flex flex-col w-full">
        <Input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <Input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          required
        />
        <Input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          required
        />
      </div>
    </div>
  );
}
