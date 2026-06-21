// Upgraded memory store to capture contact metrics
let state = {
  queue: [],        
  currentTokenCount: 0,
  nowServing: null
};

export const getQueueState = () => {
  return {
    queue: state.queue,
    nowServing: state.nowServing
  };
};

export const addPatient = (name, avgTime, phone) => {
  state.currentTokenCount += 1;
  const token = `T${String(state.currentTokenCount).padStart(3, '0')}`;
  
  const newPatient = {
    token,
    name,
    phone: phone || '', // Saving phone number
    avgTime: parseInt(avgTime) || 5,
    status: "waiting"
  };
  
  state.queue.push(newPatient);
  return getQueueState();
};

export const callNextPatient = () => {
  if (state.nowServing) {
    const currentIdx = state.queue.findIndex(p => p.token === state.nowServing.token);
    if (currentIdx !== -1) {
      state.queue[currentIdx].status = "done";
    }
  }

  const nextPatient = state.queue.find(p => p.status === "waiting");
  
  if (nextPatient) {
    nextPatient.status = 'serving';
    state.nowServing = nextPatient;
  } else {
    state.nowServing = null;
  }
  
  return getQueueState();
};