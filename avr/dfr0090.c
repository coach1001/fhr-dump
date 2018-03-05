void shiftOut(GPIO dataPin, GPIO clockPin, bool MSBFIRST, uint8_t command)
{
  for (int i = 0; i < 8; i++)
  {
    bool output = false;
    if (MSBFIRST)
    {
      output = command & 0b10000000;
      command = command << 1;
    }
    else
    {
      output = command & 0b00000001;
      command = command >> 1;
    }
    writePin(dataPin, output);
    writePin(clockPin, true);
    sleep(1)
    writePin(clockPin, false);
    sleep(1)
  }
}