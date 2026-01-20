
import { AtlasData } from './types';
import { META } from './data/meta';
import { LAYERS } from './data/layers';
import { AI_TASKS } from './data/ai_tasks';
import { HUMAN_TASKS } from './data/human_tasks';
import { SYSTEM_TASKS } from './data/system_tasks';
import { DATA_ARTIFACTS } from './data/artifacts';
import { CONSTRAINTS } from './data/constraints';
import { TOUCHPOINTS } from './data/touchpoints';
import { WORKFLOW_TEMPLATES } from './data/templates';
import { EXAMPLES } from './data/examples';

export const ATLAS_DATA: AtlasData = {
  meta: META,
  layers: LAYERS,
  ai_tasks: AI_TASKS,
  human_tasks: HUMAN_TASKS,
  system_tasks: SYSTEM_TASKS,
  data_artifacts: DATA_ARTIFACTS,
  constraints: CONSTRAINTS,
  touchpoints: TOUCHPOINTS,
  workflow_templates: WORKFLOW_TEMPLATES,
  examples: EXAMPLES
};
