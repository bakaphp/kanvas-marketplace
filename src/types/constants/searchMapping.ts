export const attributeMapping = {
  'attributes.cpu.quick_spec': 'cpu',
  'attributes.gpu.quick_spec': 'video',
  'attributes.ram.quick_spec': 'ram',
  'attributes.storage.quick_spec': 'storage',
};

export const reverseAttributeMapping = Object.fromEntries(
  Object.entries(attributeMapping).map(([key, value]) => [value, key]),
);
