import Input from "@/components/ui/Input";

export default function GiftDetailsForm({
  form,
  handleChange,
  eventTypes,
  productTypes,
}) {
  return (
    <div className="space-y-6 border-2 border-gray-300 shadow-lg flex flex-col items-start justify-center p-4 rounded-lg w-full">
      <h2 className="text-xl font-semibold text-secondary"> Gift Details</h2>
      <div className="space-y-4 w-full">
        <div className="flex md:flex-row flex-col gap-4 w-full">
          <div className="w-full">
            <Input
              type="select"
              name="event_type"
              value={form.event_type}
              onChange={handleChange}
              placeholder="Select Event Type"
              options={eventTypes}
            />
          </div>

          <div className="w-full">
            <Input
              type="select"
              name="product_type"
              value={form.product_type}
              onChange={handleChange}
              placeholder="Select Product Type"
              options={productTypes}
            />
          </div>
        </div>

        <Input
          type="number"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          required
          className="w-full"
        />
        <Input
          type="color"
          name="color"
          value={form.color}
          onChange={handleChange}
          placeholder="Select Color"
        />

        <Input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          className="w-full"
        />

        <Input
          type="checkbox"
          name="wrapping"
          checked={form.wrapping}
          onChange={handleChange}
          placeholder="Gift Wrapping"
        />

        <Input
          type="textarea"
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Additional message or note"
          className="w-full"
        />
      </div>
    </div>
  );
}
