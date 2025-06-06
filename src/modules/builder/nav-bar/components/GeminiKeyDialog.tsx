import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { OutlinedButton, TextButton } from '@/helpers/common/atoms/Buttons';
import { useGemini } from '@/stores/gemini';
import { useState, useEffect } from 'react';

const GeminiKeyDialog = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const apiKey = useGemini((state) => state.apiKey);
  const setApiKey = useGemini((state) => state.setApiKey);
  const [value, setValue] = useState(apiKey);

  useEffect(() => {
    if (open) {
      setValue(apiKey);
    }
  }, [apiKey, open]);

  const handleSave = () => {
    setApiKey(value.trim());
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Gemini API Key</DialogTitle>
      <DialogContent>
        <TextField
          label="API Key"
          variant="filled"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoComplete="off"
          fullWidth
          autoFocus
        />
      </DialogContent>
      <DialogActions>
        <OutlinedButton onClick={handleSave}>Save</OutlinedButton>
        <TextButton onClick={onClose}>Cancel</TextButton>
      </DialogActions>
    </Dialog>
  );
};

export default GeminiKeyDialog;
