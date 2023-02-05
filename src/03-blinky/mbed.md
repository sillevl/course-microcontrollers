# Mbed

```cpp
#include "mbed.h"

int main()
{
    // Creates a DigitalOut object and connects it to the pin with name LED1
    DigitalOut led(LED1);  

    while (true) {
        // Shorthand notation for led.write(!led.read());
        led = !led;
        ThisThread::sleep_for(500ms);
    }
}
```
