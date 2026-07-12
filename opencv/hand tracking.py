import cv2
import mediapipe as mp
import math
def calculate_distance(point1, point2):
    dx = point1.x - point2.x
    dy = point1.y - point2.y
    distance = math.sqrt(dx**2 + dy**2)
    return distance

mp_drawing = mp.solutions.drawing_utils
mp_hands = mp.solutions.hands
hands = mp_hands.Hands()

webcam = cv2.VideoCapture(0)
g_chord_ranges = {
    "distance": (0.02, 0.15),        
    "middle_distance": (0.02, 0.15), 
    "ring_distance": (0.02, 0.15), 
    "pinky_distance": (0.05, 0.25),  
}

while True:
    got_frame, frame = webcam.read()

    if not got_frame:
        break

    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    results = hands.process(rgb)

    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            mp_drawing.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)
            
            thumb_tip = hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_TIP]
            index_finger_tip = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_TIP]
            distance = calculate_distance(thumb_tip, index_finger_tip)
            print(f"Distance between thumb and index finger: {distance}")
            index_tip= hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_TIP]
            middle_tip = hand_landmarks.landmark[mp_hands.HandLandmark.MIDDLE_FINGER_TIP]
            middle_distance = calculate_distance(index_tip, middle_tip)
            print(f"Distance between index and middle finger: {middle_distance}")
            ring_tip = hand_landmarks.landmark[mp_hands.HandLandmark.RING_FINGER_TIP]
            ring_distance = calculate_distance(middle_tip, ring_tip)
            print(f"Distance between middle and ring finger: {ring_distance}")
            pinky_tip = hand_landmarks.landmark[mp_hands.HandLandmark.PINKY_TIP]
            pinky_distance = calculate_distance(ring_tip, pinky_tip)
            print(f"Distance between ring and pinky finger: {pinky_distance}")
            index_ratio = distance / middle_distance if middle_distance != 0 else 0
            print(f"Index to middle finger distance ratio: {index_ratio}")
            middle_ratio = middle_distance / ring_distance if ring_distance != 0 else 0
            print(f"Middle to ring finger distance ratio: {middle_ratio}")
            ring_ratio = ring_distance / pinky_distance if pinky_distance != 0 else 0
            print(f"Ring to pinky finger distance ratio: {ring_ratio}")
            pinky_ratio = pinky_distance / distance if distance != 0 else 0
            print(f"Pinky to index finger distance ratio: {pinky_ratio}")
            values = {
                "distance": distance,
                "middle_distance": middle_distance,
                "ring_distance": ring_distance,
                "pinky_distance": pinky_distance,
            }

            finger_status = {}
            for name, (low, high) in g_chord_ranges.items():
                finger_status[name] = low <= values[name] <= high

            all_correct = all(finger_status.values())
            wrong_ones = [f for f, ok in finger_status.items() if not ok]

            if all_correct:
                cv2.putText(frame, "CORRECT - G chord!", (30, 400),
                            cv2.FONT_HERSHEY_SIMPLEX, 1.0, (0, 255, 0), 3)
            else:
                cv2.putText(frame, f"WRONG: {', '.join(wrong_ones)}", (30, 400),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)


    cv2.imshow("My Webcam", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

webcam.release()
cv2.destroyAllWindows()